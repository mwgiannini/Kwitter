USE kwitterdb;

-- ---------------------------------------------------------------
-- Select Statements ---------------------------------------------
-- ---------------------------------------------------------------

-- See a user's favorited kweets
SELECT * FROM favorite WHERE favorite_username = 'tut_the_gut';

-- See a list of who a user is following
SELECT following FROM follow WHERE follower = 'mw';

-- See a list of a user's followers
SELECT follower FROM follow WHERE following = 'cat_god';

-- See how many times a kweet has been favorited
SELECT COUNT(*) FROM favorite WHERE kweet_username = 'frank' AND kweet_post_time = '2022-07-11 10:00:00';

-- See how many times a kweet has been rekweeted
SELECT COUNT(*) FROM rekweet WHERE kweet_username = 'cat_god' AND kweet_post_time = '2022-07-10 08:45:00';

-- See how many followers a user has
SELECT COUNT(*) FROM follow WHERE following = 'cat_god';

-- See how many users one is following
SELECT COUNT(*) FROM follow WHERE follower = 'humphrey_dumpty';

-- ---------------------------------------------------------------
-- Procedure Calls -----------------------------------------------
-- ---------------------------------------------------------------

-- Post a kweet to kwitter
CALL post_kweet("tut_the_gut", "I miss freedom.");

-- Follow/Unfollow user
CALL toggle_follow("mw", "me_wang");

-- Timeline
CALL timeline('me_wang');

-- Rekweet a user's kweet
CALL rekweet('tut_the_gut', 'me_wang', '2022-07-29 15:42:00');

-- Delete a kweet
CALL delete_kweet('tut_the_gut', '2022-07-29 15:42:00');

-- Favorite/Unfavorite
CALL toggle_favorite('cat_god', '2022-07-23 02:30:03', 'tut_the_gut');


-- ---------------------------------------------------------------
-- Procedure Definitions -----------------------------------------
-- ---------------------------------------------------------------

-- Post kweet --
delimiter //
DROP PROCEDURE IF EXISTS post_kweet;
CREATE PROCEDURE post_kweet(
	IN username VARCHAR(20),
	IN message VARCHAR(280)
)
BEGIN
INSERT INTO kweet(username, message) VALUES(
	username,
	message
);
END//
delimiter ;

-- Follow/unfollow user --
delimiter //
DROP PROCEDURE IF EXISTS toggle_follow;
CREATE PROCEDURE toggle_follow (
	IN this_following VARCHAR(20),
    IN this_follower VARCHAR(20)
)
BEGIN
IF EXISTS (SELECT * FROM follow WHERE following = this_following AND follower = this_follower)
	THEN
    DELETE FROM follow WHERE following = this_following AND follower = this_follower;
    ELSE
    INSERT INTO follow VALUES(this_following, this_follower);
END IF;
END//
delimiter ;

-- Display timeline --
delimiter //
DROP PROCEDURE IF EXISTS timeline;
CREATE PROCEDURE timeline(
	IN this_username VARCHAR(20)
)
BEGIN
SELECT DISTINCT username, post_time, message FROM kweet
	JOIN follow ON follower = this_username
		JOIN rekweet ON rekweet_username = following
	WHERE following = username OR kweet_username = username
	ORDER BY post_time DESC;
END//
delimiter ;

-- Rekweet a kweet --
delimiter //
DROP PROCEDURE IF EXISTS rekweet;
CREATE PROCEDURE rekweet(
	IN kweeter VARCHAR(20),
    IN rekweeter VARCHAR(20),
    IN kweet_time DATETIME
)
BEGIN
IF NOT EXISTS( 
	SELECT * FROM rekweet 
    WHERE rekweet_username = rekweeter 
    AND kweet_username = kweeter 
    AND kweet_post_time = kweet_time
) THEN
INSERT INTO rekweet(rekweet_username, kweet_username, kweet_post_time)
	VALUES(rekweeter, kweeter, kweet_time);
END IF;
END//
delimiter ;

-- Delete a kweet --
delimiter //
DROP PROCEDURE IF EXISTS delete_kweet;
CREATE PROCEDURE delete_kweet(
	IN this_username VARCHAR(20),
    IN this_time DATETIME
)
BEGIN
DELETE FROM favorite 
WHERE kweet_username = this_username AND kweet_post_time;
DELETE FROM rekweet
WHERE kweet_username = this_username AND kweet_post_time;
DELETE FROM kweet
WHERE username = this_username AND post_time = this_time;
END//
delimiter ;


-- Favorite/unfavorite kweet --
delimiter //
DROP PROCEDURE IF EXISTS toggle_favorite;
CREATE PROCEDURE toggle_favorite (
    IN this_username VARCHAR(20),
    IN this_post_time DATETIME,
	IN this_fav_username VARCHAR(20)
)
BEGIN
IF EXISTS (SELECT * FROM favorite
			WHERE favorite_username = this_fav_username 
            AND kweet_username = this_username 
            AND kweet_post_time = this_post_time)
	THEN
    DELETE FROM favorite
			WHERE favorite_username = this_fav_username 
            AND kweet_username = this_username 
            AND kweet_post_time = this_post_time;
    ELSE
    INSERT INTO favorite VALUES(this_username, this_post_time, this_fav_username);
END IF;
END//
delimiter ;