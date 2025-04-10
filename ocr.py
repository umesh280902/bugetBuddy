from donut import DonutModel
from PIL import Image
import torch
import sys
import json

model = DonutModel.from_pretrained("./trained_model")
if torch.cuda.is_available():
    model.half()
    device = torch.device("cuda")
    model.to(device)
# else:
#     model.encoder.to(torch.bfloat16)
model.eval()
img_path = 'upload/X00016469671.jpg'
image = Image.open(img_path).convert("RGB")

output = model.inference(image=image, prompt="<s_data>")
output_refined = json.dumps(output)
print(output_refined)