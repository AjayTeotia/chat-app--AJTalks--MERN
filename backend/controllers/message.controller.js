import httpStatus from "http-status";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/soket.js";

export const sendMessage = async (req, res) => {
  //console.log("MESSAGE SENT", req.params.id);

  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    //await newMessage.save();

    if (newMessage) {
      conversation.message.push(newMessage._id);

      res.status(httpStatus.CREATED).json({
        senderId: newMessage.senderId,
        receiverId: newMessage.receiverId,
        message: newMessage.message,
      });
    } else {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "INTERNAL SERVER ERROR" });
    }

    //await conversation.save();

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    //socket id
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    //console.log("MESSAGE SENT SUCCESSFULLY");
  } catch (error) {
    console.log(`ERROR IN SEND MESSAGE CONTROLLER: ${error.message}`);
    res.status(httpStatus.BAD_REQUEST).json({ error: "INTERNAL SERVER ERROR" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user?._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("message"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.message;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
