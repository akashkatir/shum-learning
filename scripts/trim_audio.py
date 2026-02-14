import os
import glob
import subprocess
import shutil

# Make sure to run this from the project root
AUDIO_DIR = os.path.join("static", "audio")

# Recursive search for m4a files
M4A_FILES = []
for root, dirs, files in os.walk(AUDIO_DIR):
    for file in files:
        if file.endswith(".m4a"):
            M4A_FILES.append(os.path.join(root, file))

if not M4A_FILES:
    print(f"No .m4a files found in {AUDIO_DIR}")
    exit()

print(f"Found {len(M4A_FILES)} files.")

FFMPEG_BIN = "ffmpeg"
# Add known paths where winget installs ffmpeg
POSSIBLE_PATHS = [
    r"C:\Users\akash\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe",
    r"C:\Users\akash\AppData\Local\Microsoft\WindowsApps\ffmpeg.exe"
]

def find_ffmpeg():
    global FFMPEG_BIN
    try:
        subprocess.run([FFMPEG_BIN, "-version"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        return True
    except (FileNotFoundError, subprocess.CalledProcessError):
        pass
    
    for path in POSSIBLE_PATHS:
        if os.path.isfile(path):
            FFMPEG_BIN = path
            return True
            
    return False

if not find_ffmpeg():
    print("Error: ffmpeg is not installed or not in PATH.")
    print("Please install ffmpeg to run this script. You can run 'winget install ffmpeg' in PowerShell.")
    exit(1)

print(f"Using ffmpeg at: {FFMPEG_BIN}")

# ffprobe usually sits next to ffmpeg
FFPROBE_BIN = "ffprobe"
if os.path.isabs(FFMPEG_BIN):
    FFPROBE_BIN = os.path.join(os.path.dirname(FFMPEG_BIN), "ffprobe.exe")
    if not os.path.exists(FFPROBE_BIN):
        FFPROBE_BIN = "ffprobe" # fallback

for file_path in M4A_FILES:
    try:
        # Get duration
        cmd = [FFPROBE_BIN, "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", file_path]
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        duration_str = result.stdout.strip()
        if not duration_str:
             print(f"Could not determine duration for {file_path}")
             continue
        duration = float(duration_str)
        
        new_duration = duration - 0.1
        if new_duration <= 0:
            print(f"Skipping {file_path}: too short ({duration}s)")
            continue

        temp_file = file_path + ".tmp.m4a"
        
        # Trim using -t (output duration)
        # using -c copy for speed/quality preservation
        subprocess.run([FFMPEG_BIN, "-i", file_path, "-t", str(new_duration), "-c", "copy", temp_file, "-y"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        
        # Replace original
        shutil.move(temp_file, file_path)
        print(f"Trimmed {os.path.basename(file_path)}: {duration:.2f}s -> {new_duration:.2f}s")
        
    except Exception as e:
        print(f"Failed to process {file_path}: {e}")
