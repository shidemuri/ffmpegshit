import os
import cv2

folder_path = "ohlord"
image_files = [f for f in os.listdir(folder_path) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.bmp'))]

for image_file in image_files:
    image_path = os.path.join(folder_path, image_file)
    
    cv2.imwrite(os.path.join("ohlord", f"{image_file}"), cv2.Canny(cv2.imread(image_path, cv2.IMREAD_GRAYSCALE), 180, 255))
    

print("Edge detection completed for all images.")