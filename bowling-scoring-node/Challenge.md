Write a node module which implements a game of bowling (see http://bowling.about.com/od/rulesofthegame/a/bowlingscoring.htm for a description of how bowling is scored).  The application should expose to REST service to calculate a bowling game score:

1. AddUser - To add a user (id and name) . Method to add use Id and name.
2. DeleteUser - To delete user (id)
3. Play- Pass userid and  a string between 12 and 21 characters long where each character represents a throw: X for a strike, / for a spare, or a number indicating how many pins were knocked down.
4. RealTimePlay - The Game class should define a function that takes a single argument indicating the score of one throw and userId, and returns the running score for the whole game.
5. Score - Takes userId and should return the current total score and username.

Notes:
1. Structure your project well 
2. Unit test the logic
3. Keep in mind scalability and multiple user access
4. Clarity is valued over cleverness.

Example games:
1. Game('XXXXXXXXXXXX').score == 300 , player - TOM
2. Game('90909090909090909090').score == 90 , player - JERRY
3. Game('5/5/5/5/5/5/5/5/5/5/5').score == 150 , player - TOM
4. Game('X7/729/XXX236/7/3').score == 168 , player - ANDREW
5. Game('00000000000000000000').score == 0 , player - TOM
6. Game('01273/X5/7/345400X70').score == 113 , player - TOM
7. Game('X7/90X088/06XXX81').score == 167 , player - MIKE
