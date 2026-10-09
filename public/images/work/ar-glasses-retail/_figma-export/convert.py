# Converts Figma's 2x PNG exports (named after their layers in 973:2419) to the WebP files the site uses.
# Run from anywhere: python3 convert.py
import os
from PIL import Image
here = os.path.dirname(os.path.abspath(__file__))
out = os.path.dirname(here)
names = {
 "background": "hero",
 "image 16": "logo-vessi", "image 13": "logo-artbox", "image 15": "logo-fujiya",
 "Isolation_Mode": "pain-restock", "Group": "pain-product-knowledge", "Collage Element 2": "pain-inventory",
}
opaque = {"hero"}
missing = []
for layer, web in names.items():
    src = os.path.join(here, layer + ".png")
    if not os.path.exists(src):
        missing.append(layer); continue
    im = Image.open(src).convert("RGB" if web in opaque else "RGBA")
    im.save(os.path.join(out, web + ".webp"), "WEBP", quality=86, method=6)
    print(f"{web}.webp  {im.size[0]}x{im.size[1]}")
print("missing:", missing or "none")
