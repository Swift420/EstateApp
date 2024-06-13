import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {

    const tokenUserId = req.userId;

  try {
    const chats = await prisma.chat.findMany({
        where: {
           userIDs: {
            hasSome: [tokenUserId]
           } 
        },
        });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chats" });
  }
}

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

    try {
      const chat = await prisma.chat.findUnique({
        where: {
          id: req.params.id,
          userIDs: {
            hasSome: [tokenUserId]
          }
        },
        include: {
          messages: {
            orderBy: {
              createdAt: 'asc'
            }
          }
        }
      });

      await prisma.chat.update({
        where: {
          id: req.params.id
        },
        data: {
          seenBy: {
            set: [tokenUserId]
          }
        }
      })
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ message: "Error getting chats" });
    }
  }

  export const addChat = async (req, res) => {
    const tokenUserId = req.userId;

    const newChat = await prisma.chat.create({
      data: {
        userIDs:[tokenUserId, req.body.receiverId]
      }
    });
    try {
      res.status(200).json(newChat);
    } catch (error) {
      res.status(500).json({ message: "Error adding chats" });
    }
  }

  export const readChat = async (req, res) => {
    const tokenUserId = req.userId;

    try {
      const chat = await prisma.chat.update({
        where: {
          id: req.params.id,
          userIDs: {
            hasSome: [tokenUserId]
          }
        },
        data: {
          seenBy: {
            set: [tokenUserId]
          }
        }
      })
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ message: "Error reading chats" });
    }
  }
  