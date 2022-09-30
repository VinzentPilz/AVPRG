import numpy as np
import cv2

img = np.full(shape=(300, 400, 3), fill_value=[0, 128, 128], dtype=np.uint8)

#Beispiel Zebrastreifen
for x in range (0, img.shape[1], 20): #img.shape[1] -> Breite des Bildes    for-Schleife von 0 bis Ende in 20er Schritten
    img[:, x: x+10] = [0,0,0] #y bleibt alles gleich, für x wird der Bereich von x bis x+10 schwarz gesetzt
cv2.imshow("Beispiele", img)
cv2.waitKey(0)
cv2.destroyAllWindows()