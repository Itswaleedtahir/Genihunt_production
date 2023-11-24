const { SavedCompany, Notifications, Recents } = require("../models/index");
const recents = require("../models/recents");
const { sendEmailWithAttachment } = require("../middleware/sendEmail");
module.exports = {

  // Company saving API
  Save: async (req, res, io) => {
    try {
      const { Data } = req.body;
      const companyname = Data.Firmnavn;
      const key = Data.the_key;
      const userData = req.user;
      const user_id = userData.id;
      const companyFound = await SavedCompany.findOne({
        where: {
          "Company_data.the_key": key,
        },
      });
      if (companyFound) {
        throw { status: 409, message: "Company already Saved." };
      }
      const savedData = await SavedCompany.create({
        user_id: user_id,
        comapny_name: companyname,
        Company_data: Data,
      });
      const enumValue =
        Notifications.rawAttributes.notification_type.type.values[2];
      const notification = await Notifications.create({
        message: "Company Saved Successfully",
        notification_type: enumValue,
        Details: companyname,
        user_id: user_id,
      });
      return res.status(201).send({
        status: "Saved",
        savedData: savedData,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  get: async (req, res) => {
    try {
      const userData = req.user;
      const user_id = userData.id;

      const data = await SavedCompany.findAll({
        where: {
          user_id: user_id,
        },
      });
      return res.status(201).send(data);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await SavedCompany.findOne({ where: { id: id } });
      if (!data) return res.status(400).send("No such node exists.");

      const deleted = await SavedCompany.destroy({ where: { id: id } });
      const userData = req.user;
      const user_id = userData.id;
      const companies = await SavedCompany.findAll({
        where: { user_id: user_id },
      });

      return res.status(200).send({
        message: "Company deleted successfully",
        companies: companies,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  get_notifications: async (req, res) => {
    try {
      const userData = req.user;
      const user_id = userData.id;
      const notification = await Notifications.findAll({
        where: {
          user_id: user_id,
          isRead: false,
        },
      });
      return res.status(200).send(notification);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  read_notifications: async (req, res) => {
    try {
      const { notificationIds } = req.body; // Expect a single notification ID

      // Check if notificationId is provided
      if (!notificationIds) {
        return res.status(400).json({ error: "notificationId is required" });
      }

      // Update the notification to mark it as read
      await Notifications.update(
        { isRead: true },
        { where: { id: notificationIds } }
      );

      // Delete the notification with the specified ID
      await Notifications.destroy({ where: { id: notificationIds } });

      return res.status(200).json({ isRead: "Read" });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  get_recent: async (req, res) => {
    try {
      const userData = req.user;
      const user_id = userData.id;

      const recentSearches = await Recents.findAll({
        where: { user_id: user_id },
        order: [["createdAt", "DESC"]],
        limit: 4,
      });
      return res.status(200).send(recentSearches);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
  },
  sendEmail: async (req, res) => {
    try {
      const pdfBuffer = req.file.buffer; // Get the PDF file as a buffer
      const userData = req.user;
      const email = userData.email;

      // Send the email with the PDF attachment
      sendEmailWithAttachment(email, pdfBuffer);

      return res.status(200).send({ message: "File uploaded and email sent." });
    } catch (error) {
      console.log(error);
      return res
        .status(error.status || 500)
        .send(error.message || "something went wrong...");
    }
  },
};
