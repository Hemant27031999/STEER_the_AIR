# STEER THE AIR

<img src="https://github.com/Hemant27031999/STEER_the_AIR/blob/master/images/DemoVid.gif" width="860"/>

Ever seen a MAGICIAN swinging his finger in the air and making the objects to fly around??? Well, I don't know the trick behind it, I am so sorry for that :( , but what best I can do for you is, I can give you a power alike that. Here is a small and simple game for you where you control the speed and the direction of the car by just using the tip of your index finger. See it live here : https://hemant27031999.github.io/STEER_the_AIR/

## How it works?

I used the [TENSORFLOW MEDIAPIPE HANDPOSE](https://github.com/tensorflow/tfjs-models/tree/master/handpose) model to detect the hand position in the live video. This model gives you a set of 21 points corresponding to your fingers and thumb. The game lags a little bit because some time is required to detect the hand and find out the points. Once detected, I simply calculate the distance and the direction of the tip of index finger vector with respect to centre and make the car to move according to that vector.

## About the game

The game is built using p5.js (for making the objects to move around), html (drawing canvas and other layouts) and the tensorflow handpose model (for finding out the hand's position). You have to drive the car using the tip of your index finger, by constantly eating the food present in the ground and saving yourself from the enemies. The energy of the enemies and your car itself decreses at a constant rate over the time. To increase it, you have to eat the food to boost up your strength and your enemies will feed on you for their power. There is a rotating saw blade in the ground with sharp edges, so if anyone come in contact with it, it will get destroyed. The enemy object does not have any intelligence, they just simply follow random path and may collide with the rotating blade. However, they are intelligent enough to see you and chase you from a distance. Use your wits to make them collide with the blade and earn points. The more you eat and the more enemies get killed, the more points you get. However, if you collide with a enemy, your health as well as your score both decreases. Try not to include more than one hand, that can confuse the model as to which hand to be followed. It will be better if the bakground is simple and plain, that will help to easily detect the hand. If you remove your hand from the video, the last determined position of the hand will be used for the reference.

## Contributing

The game is presently very simple and there is enough scope of improvement. We can add different types of food, obstackles and enemies. Just send a PR if you want to contribute.

