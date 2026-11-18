#!/usr/bin/env bash
# Transcode the source clips in Videos/ into monochrome HD web backgrounds (public/videos/).
# Each clip is made seamlessly loopable: its last XF seconds cross-dissolve into its first
# XF seconds, so when the <video loop> wraps around there is no visible jump.
# Outputs 1080p + 720p H.264 (30fps, no audio, faststart) and a JPEG poster.
set -e
cd "$(dirname "$0")/.."
OUT=public/videos
XF=1.5
mkdir -p "$OUT"
encode() { # src name
  local src="Videos/$1" name=$2
  local D; D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$src")
  local tone="hue=s=0,eq=contrast=1.08:brightness=-0.02,fps=30,format=yuv420p,setsar=1"
  for H in 1080 720; do
    local W=$((H * 16 / 9)) crf=$([ $H = 1080 ] && echo 24 || echo 26)
    local fit="scale=$W:$H:force_original_aspect_ratio=increase,crop=$W:$H"
    # body = [XF, D]; head = [0, XF]; xfade the tail of body into head -> length D-XF, loops seamlessly
    ffmpeg -v error -y -i "$src" -an -filter_complex "\
      [0:v]$tone,$fit,split[a][b];\
      [a]trim=start=$XF,setpts=PTS-STARTPTS[body];\
      [b]trim=end=$XF,setpts=PTS-STARTPTS[head];\
      [body][head]xfade=transition=fade:duration=$XF:offset=$(awk "BEGIN{print $D - 2*$XF}")[v]" \
      -map "[v]" -c:v libx264 -preset slow -crf $crf -pix_fmt yuv420p -profile:v high -movflags +faststart "$OUT/$name-$H.mp4"
  done
  ffmpeg -v error -y -ss 0 -i "$OUT/$name-1080.mp4" -frames:v 1 -q:v 4 "$OUT/$name-poster.jpg"
  echo "done $name"
}
encode 13427339_3840_2160_25fps.mp4 cliff &
encode 12981133_1920_1080_30fps.mp4 clouds &
encode 14152520_3840_2160_60fps.mp4 coast &
encode 8747386-uhd_4096_2160_30fps.mp4 road &
wait
ls -la "$OUT"
