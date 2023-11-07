import {
    child,
    equalTo,
    get,
    orderByChild,
    query,
    ref,
    remove,
    set,
} from "firebase/database";
import { rdb } from "./firebase";

export const addToOnlineUsers = (peerId, name, userId, interests) => {
    const newUserRef = ref(rdb, "onlineUsers/" + peerId);
    const onlineUsersRef = ref(rdb, "onlineUsers");
    const userRef = query(
        onlineUsersRef,
        orderByChild("userId"),
        equalTo(userId)
    );

    get(userRef)
        .then((snapshot) => {
            if (!snapshot.exists()) {
                set(newUserRef, {
                    username: name,
                    userId: userId,
                    interests: interests,
                });
                console.log("user added");
            } else {
                console.log("user already exists");
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

export const getAllOnlineUsers = () => {
    const onlineUsersRef = ref(rdb, "onlineUsers");
    get(onlineUsersRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                return snapshot.val();
            } else {
                console.log("No data available");
                return {};
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

export const countOnlineUsers = async () => {
    try {
        const onlineUsersRef = ref(rdb, "onlineUsers");
        const snapshot = await get(onlineUsersRef);

        if (snapshot.exists()) {
            const onlineUsersData = snapshot.val();
            const numberOfOnlineUsers = Object.keys(onlineUsersData).length;
            console.log("Number of online users:", numberOfOnlineUsers);
            return numberOfOnlineUsers;
        } else {
            console.log("No data available in onlineUsers.");
            return 0;
        }
    } catch (error) {
        console.error("Error counting online users:", error);
        throw error;
    }
};

export const deleteOnlineUserByUserId = (userId) => {
    const usersRef = ref(rdb, "onlineUsers");
    const userRef = query(usersRef, orderByChild("userId"), equalTo(userId));

    get(userRef)
        .then((userSnapshot) => {
            userSnapshot.forEach((childSnapshot) => {
                const userKey = childSnapshot.key;
                const userPath = "onlineUsers/" + userKey;
                const userRef = ref(rdb, userPath);

                remove(userRef)
                    .then(() => {
                        console.log(
                            `User with userId ${userId} deleted successfully.`
                        );
                    })
                    .catch((error) => {
                        console.error("Error deleting user:", error);
                    });
            });
        })
        .catch((error) => {
            console.error("Error finding user by userId:", error);
        });
};

export const createRoom = async (roomId) => {
    const roomRef = ref(rdb, "rooms/" + roomId);

    set(roomRef, {
        participants: ["", ""],
    })
        .then(() => {
            console.log("Room created with ID: " + roomId);
        })
        .catch((error) => {
            console.error("Error creating room:", error);
        });
};

export const getAllRoom = () => {
    const roomsRef = ref(rdb, "rooms");
    get(roomsRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

export const joinRoomParticipants = (roomId, newParticipants) => {
    const roomRef = ref(rdb, "rooms/" + roomId + "/participants");

    set(roomRef, newParticipants)
        .then(() => {
            console.log("Participants updated for room: " + roomId);
        })
        .catch((error) => {
            console.error("Error updating participants:", error);
        });
};

export const deleteRoomByRoomId = (roomId) => {
    const roomRef = ref(rdb, "rooms/" + roomId);

    remove(roomRef)
        .then(() => {
            console.log("Room with ID " + roomId + " deleted.");
        })
        .catch((error) => {
            console.error("Error deleting room:", error);
        });
};

export const checkIfUserInRoom = async (roomId, userId) => {
    const roomRef = ref(rdb, "rooms/" + roomId + "/participants");

    try {
        const snapshot = await get(roomRef);
        if (snapshot.exists()) {
            const participants = snapshot.val();
            const filteredParticipants = participants.filter((item) => item);
            return (
                filteredParticipants.length === 2 &&
                filteredParticipants.includes(userId)
            );
        } else {
            console.log("Room not found or has no participants.");
            return false;
        }
    } catch (error) {
        console.error("Error checking if user is in room:", error);
        throw error;
    }
};

export const getRoomParticipants = async (roomId) => {
    const roomRef = ref(rdb, "rooms/" + roomId + "/participants");

    try {
        const snapshot = await get(roomRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const participants = data.filter((key) => key);
            return participants;
        } else {
            console.log("Room not found or has no participants.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching room participants:", error);
        throw error;
    }
};

export const getRoomsForUser = async (userId) => {
    const roomsRef = ref(rdb, "rooms");

    try {
        const roomsSnapshot = await get(roomsRef);
        if (roomsSnapshot.exists()) {
            const roomsData = roomsSnapshot.val();
            const roomsKeys = Object.keys(roomsData);

            const roomsWhereUserExists = roomsKeys.filter(async (roomKey) => {
                const usersRef = child(roomsRef, `${roomKey}/users`);
                const usersSnapshot = await get(usersRef);

                if (usersSnapshot.exists()) {
                    const usersData = usersSnapshot.val();
                    return userId in usersData;
                }

                return false;
            });

            const resolvedRooms = await Promise.all(roomsWhereUserExists);

            return resolvedRooms[0];
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const deleteMatchedUser = async (userId) => {
    const matchUsersRef = ref(rdb, "matchedUsers");
    try {
        const matchUsersSnapshot = await get(matchUsersRef);
        if (matchUsersSnapshot.exists()) {
            const existingUsers = matchUsersSnapshot.val();
            if (Array.isArray(existingUsers)) {
                const userIndex = existingUsers.indexOf(userId);
                if (userIndex !== -1) {
                    existingUsers.splice(userIndex, 1);
                    set(matchUsersRef, existingUsers);
                }
            }
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};