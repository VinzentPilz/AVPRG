from cv2 import threshold
import numpy as np
import cv2

#Video aus Datei öffnen
cap = cv2.VideoCapture("Micro-dance_2_.wm")
img = cv2.imread("Finkenau.jpg")

size = (int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)), int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)))
#print(size)
scaleX = cap.get(cv2.CAP_PROP_FRAME_WIDTH) / img.shape[1]
scaleY = cap.get(cv2.CAP_PROP_FRAME_HEIGHT) / img.shape[0]
img = cv2.resize(img, None, fx=scaleX, fy=scaleY, interpolation = cv2.INTER_AREA)
#print(img.shape)

threshold = 26
frameCount = 0
while cap.isOpened():
    ret, frame = cap.read()

    #Video in Graustufen wandeln
    mask = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    if frameCount == 0:
        #Wichtig Aufruf copy(): firstFrame = mask würde keine Pixel kopieren 
        firstFrame = mask.copy()
        cv2.imshow("Background Model", firstFrame)
        frameCount += 1

    #aktuelles Frame vom Hintergrund subtrahieren
    cv2.absdiff(mask, firstFrame, mask)

    #Schwellwertbildung
    ret, mask = cv2.threshold(mask, threshold, 255, cv2.THRESH_BINARY)

    #Maske darstellen
    cv2.imshow("Maske", mask)

    #Invertierte Maske
    invertedMask = cv2.bitwise_not(mask)

    cv2.imshow("Invertiere Maske", invertedMask)

    #tanzenden Typ ausschneiden (schwarzer Hintergrund)
    guy = cv2.bitwise_and(frame,frame,mask = mask)

    #alle schwarzen Pixel weiß machen (Hintergrund: schwarz -> weiß)
    guy[np.where((guy==[0,0,0]).all(axis=2))] = [255,255,255]

    #auf dem Hintergrund schwarze Silhouette vom Typen anzeigen
    background = cv2.bitwise_and(img,img,mask = invertedMask)

    #schwarze Silhouette weiß färben
    background[np.where((background==[0,0,0]).all(axis=2))] = [255,255,255]

    #Typ vor weißem Hintergrund und Hintergrund mit weißer Silhouette verknüpfen
    res = cv2.bitwise_and(background, guy)

    cv2.imshow("Dancing Guy", guy)
    cv2.imshow("Background", background)
    cv2.imshow("Result", res)

    if cv2.waitKey(25) != -1:
        break


cap.release()
cv2.destroyAllWindows()