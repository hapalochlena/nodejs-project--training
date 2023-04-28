const {fetchingFriends, selectingFriend, updatingFriendLogic, deletingFriendLogic} = require('../business-logic/friends-logic');

const showingAllFriends = async (req, res) => {
	try {
		const friends = await fetchingFriends();
		return res.status(200).send(friends);
	} catch (error) {
		return res.sendStatus(500);
	}
};

const showingFriend = async (req, res) => {
	try {
		const selectedFriend = await selectingFriend(req.params.id);
		if (!selectedFriend) {
			return res.status(404).send('Friend not found');
		}
		return res.status(200).send(selectedFriend);
	} catch (error) {
		return res.sendStatus(500);
	}
};

const updatingFriend = async (req, res) => {
	try {
		const id = req.params.id;
		const { name, importance, lastContacted } = req.body; // app.use(express.json()) from app.js
		const answer = await updatingFriendLogic({id, name: name, importance: importance, lastContacted: lastContacted});
		if (!answer) {
			return res.status(404).send('Friend not found');
		}
		console.log(answer);
		return res.status(200).send(answer);
	} catch (error) {
		return res.sendStatus(500);
	}
};

const deletingFriend = async (req, res) => {
	try {
		const answer = await deletingFriendLogic(req.params.id);
		if (!answer) {
			return res.status(404).send('Friend not found');
		}
		console.log(answer);
		return res.status(200).json({success: true, data: answer});
	} catch (error) {
		return res.sendStatus(500);
	}
};


// const queryingFriends = (req, res) => {
// 	const { name, importance, lastContacted } = req.query;
// 	const { search, limit } = req.query;

// 	const x = req.friendsData;
// 	let friendsData = [...x];

// 	if (name) {
// 		friendsData = friendsData.find(friend => friend.name === name);
// 		console.log(friendsData);
// 	}
// 	if (importance) {
// 		friendsData = friendsData.find(friend => friend.importance === importance);
// 		console.log(friendsData);
// 	}
// 	if (lastContacted) {
// 		friendsData = friendsData.find(friend => friend.lastContacted === Number(lastContacted));
// 		console.log(friendsData);
// 	}
// 	if (search) {
// 		friendsData = friendsData.filter((friend) => {
// 			return friend.name.startsWith(search);
// 		});
// 	}
// 	if (limit) {
// 		friendsData = friendsData.slice(0, Number(limit));
// 	}

// 	if (friendsData < 1) {
// 		res.status(200).json({ success: true, data: []});
// 	}

// 	req.friendsData = friendsData;

// 	res.status(200).json(req.friendsData);
// };


module.exports = {
	showingAllFriends,
	showingFriend,
	updatingFriend,
	deletingFriend
	// queryingFriends
};
