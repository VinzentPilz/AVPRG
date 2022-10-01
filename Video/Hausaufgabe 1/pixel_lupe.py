import cv2
import numpy as np
import cv2

img = cv2.imread("Video\Hausaufgabe 1\Images\Chrysanthemum.jpg")

#Höhe: img[0] -> img[191]
#Breite: img[0 -> 191][0] -> img[0 -> 191][255]
#Farbe: img[Höhe][Breite][b, g, r]

cv2.imshow("Pixel-Lupe", img)

def mouseCallback(event, x, y, flags, param):
    color = img[y][x]
    
    indexHeight = 0
    while indexHeight < 10:
        indexWidth = 0
        while indexWidth < 10:
            img[indexHeight][indexWidth] = color
            indexWidth += 1
        indexHeight += 1

    cv2.imshow("Pixel-Lupe", img)


cv2.setMouseCallback("Pixel-Lupe", mouseCallback)

cv2.waitKey(0)
cv2.destroyAllWindows()