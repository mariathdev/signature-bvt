import sys
import io
from PIL import Image, ImageDraw, ImageFont
# from flask import Flask, request, send_file, render_template


# print(sys.argv[1])
# print(sys.argv[2])
# print(sys.argv[3])
# print(sys.argv[4])

imageObject = Image.open("./assets/SignatureBravanteBlank.png");
drawingEngine = ImageDraw.Draw(imageObject);

mainFont = ImageFont.truetype("arial.ttf", 40);
secondaryFont = ImageFont.truetype("arial.ttf", 36);

drawingEngine.text((875, 176), sys.argv[1], font=mainFont, fill=(255, 219, 152));
drawingEngine.text((875, 231), sys.argv[2], font=mainFont, fill=(254, 254, 254));
drawingEngine.text((875, 328), sys.argv[3], font=secondaryFont, fill=(254, 254, 254));
drawingEngine.text((875, 375), sys.argv[4], font=secondaryFont, fill=(254, 254, 254));

# imageObject.show();
imageObject.save("./testImage.png");

def imageToByteArray(image: Image) -> bytes:
	imageBytesArray = io.BytesIO();
	image.save(imageBytesArray, format="PNG");
	return imageBytesArray.getvalue();

sys.stdout.buffer.write(imageToByteArray(imageObject));
