const memberService = require('../service/memberService');
const Attendance = require('../models/attendance');

const verifyQR = async (req, res) => {

    try {

        const { token } = req.query;

        if(!token) {

            return res.status(400).json({
                success: false,
                message: "Invalid QR"
            });
        }

        const membershipResponse = await memberService.getMembership(token);
        const membership = membershipResponse[0];

        if (!membership) {

            return res.status(404).json({ valid: false, message: "Invalid, Expired, or Inactive Membership" });

        }

        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

        const duplicateScan  = await Attendance.findOne({ membershipId: membership._id, checkInTime: { $gte: oneHourAgo } }).sort({ checkInTime: -1 });

        if (duplicateScan) {

            return res.status(429).json({
                success: false,
                message: "Duplicate: Already checked in within the last hour.",
                data: duplicateScan
            });

        }

        await Attendance.create({
            membershipId: membership._id,
            clientId: membership.clientId,
            planName: membership.planName,
            checkInTime: Date.now(),
            scannedBy: req.user.email,
            dayOfWeek: new Date().getDay(),
            hourOfDay: new Date().getHours()
        });

        return res.json({
            success: true,
            message: "Attendance Marked.",
            membership: {
                clientName: membership.name,
                planName: membership.planName,
                validTill: membership.endDate,
            }
        });

    } catch(err) {
        
        return res.status(400).json({ error: err || "An internal error occurred" });

    }
}

module.exports = {
    verifyQR: verifyQR
}