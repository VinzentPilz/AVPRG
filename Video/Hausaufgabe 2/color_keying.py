from cv2 import threshold
import numpy as np
import cv2

#Video aus Datei öffnen
cap = cv2.VideoCapture("Micro-dance_2_.wm")

#bgr-Wert für die Hand
red = [36, 30, 90]

threshold_red = 19
threshold_green = 8
threshold_blue = 37
frameCount = 0

#Callback-Funktion für den Slider
def changeThresholdRed(trackbarValue):
    global threshold_red
    threshold_red = trackbarValue

def changeThresholdGreen(trackbarValue):
    global threshold_green
    threshold_green = trackbarValue

def changeThresholdBlue(trackbarValue):
    global threshold_blue
    threshold_blue = trackbarValue

while cap.isOpened():
    ret, frame = cap.read()

    #Video in seine drei Farbkanäle splitten
    b, g, r = cv2.split(frame)

    r_mask = cv2.inRange(r, red[2] - threshold_red, red[2] + threshold_red)
    g_mask = cv2.inRange(g, red[1] - threshold_green, red[1] + threshold_green)
    b_mask = cv2.inRange(b, red[0] - threshold_blue, red[0] + threshold_blue)

    mask = r_mask * g_mask * b_mask

    cv2.imshow("Original", frame)
    cv2.imshow("Channel b", b)
    cv2.imshow("Channel g", g)
    cv2.imshow("Channel r", r)
    cv2.imshow("Red Mask", r_mask)
    cv2.imshow("Green Mask", g_mask)
    cv2.imshow("Blue Mask", b_mask)
    cv2.imshow("Result", mask)

    if frameCount == 0:
        cv2.createTrackbar("Threshold", "Red Mask", 0, 127, changeThresholdRed)
        cv2.setTrackbarPos("Threshold", "Red Mask", threshold_red)

        cv2.createTrackbar("Threshold", "Green Mask", 0, 127, changeThresholdGreen)
        cv2.setTrackbarPos("Threshold", "Green Mask", threshold_green)

        cv2.createTrackbar("Threshold", "Blue Mask", 0, 127, changeThresholdBlue)
        cv2.setTrackbarPos("Threshold", "Blue Mask", threshold_blue)
        frameCount += 1

    if cv2.waitKey(25) != -1:
        break


cap.release()
cv2.destroyAllWindows()