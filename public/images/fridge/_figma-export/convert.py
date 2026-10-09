# Builds the Fridge images that still come from Figma (src/content/fridge.ts).
#
# 1. In Figma (Fridge 973:1594) export this layer at 2x PNG into this folder (keep Figma's file names;
#    an "@2x" suffix is fine).
# 2. python3 convert.py
#
# The other pieces came from Rose's source files (Oct 8) and are already in public/images/fridge:
# bea-poster, beep-boop, spring-market, soft-opening-story, cover, slide, creative-room-*, ig-post,
# tshirt.mp4 / day-in-a-life.mp4 (+ posters), ig-tomatoes, tshirt-front/back, nexa-demo.mp4 (+ poster), and texture.webp (Rose's paper texture, Oct 9, flattened onto
# surface-100 at 30%). Don't re-export those from Figma.
import glob, os, re
from PIL import Image

here = os.path.dirname(os.path.abspath(__file__))
out = os.path.dirname(here)

layers = {  # Figma layer name -> web name (2x PNG export -> WebP)
    "mokcupbea 1": "poster-mockup",
}

def stem(f):
    return re.sub(r"@\dx$", "", os.path.splitext(os.path.basename(f))[0])


files = [f for f in glob.glob(os.path.join(here, "*")) if f.lower().endswith((".png", ".jpg", ".jpeg"))]
missing = []

for layer, web in layers.items():
    hits = [f for f in files if stem(f) == layer or (layer.startswith("Screenshot") and stem(f).startswith(layer))]
    if not hits:
        missing.append(layer)
        continue
    im = Image.open(hits[0]).convert("RGBA")
    if im.getchannel("A").getextrema()[0] == 255:
        im = im.convert("RGB")
    im.save(os.path.join(out, web + ".webp"), "WEBP", quality=86, method=6)
    print(f"{web}.webp  {im.size[0]}x{im.size[1]}")

print("missing:", missing or "none")
