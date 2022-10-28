import cv2

#Video aus Datei öffnen
cap = cv2.VideoCapture("Micro-dance_2_.wm")

#hsv-Wert für die Hand
red = [354/2, 67, 35]

threshold_h = 19
threshold_s = 8
frameCount = 0

#Callback-Funktion für den Slider
def changeThresholdH(trackbarValue):
    global threshold_h
    threshold_h = trackbarValue

def changeThresholdS(trackbarValue):
    global threshold_s
    threshold_s = trackbarValue

while cap.isOpened():
    ret, frame = cap.read()

    #Video in hsv-Farbraum konvertieren
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    #Video in seine drei hsv-Kanäle splitten
    h, s, v = cv2.split(hsv)

    h_mask = cv2.inRange(h, red[0] - threshold_h, red[0] + threshold_h)
    s_mask = cv2.inRange(s, red[1] - threshold_s, red[1] + threshold_s)

    mask = h_mask * s_mask

    cv2.imshow("Original", frame)
    cv2.imshow("Channel h", h)
    cv2.imshow("Channel s", s)
    cv2.imshow("Channel v", v)
    cv2.imshow("Hue Mask", h_mask)
    cv2.imshow("Saturation Mask", s_mask)
    cv2.imshow("Result", mask)

    if frameCount == 0:
        cv2.createTrackbar("Threshold", "Hue Mask", 0, 127, changeThresholdH)
        cv2.setTrackbarPos("Threshold", "Hue Mask", threshold_h)

        cv2.createTrackbar("Threshold", "Saturation Mask", 0, 127, changeThresholdS)
        cv2.setTrackbarPos("Threshold", "Saturation Mask", threshold_s)

        frameCount += 1

    if cv2.waitKey(25) != -1:
        break


cap.release()
cv2.destroyAllWindows()