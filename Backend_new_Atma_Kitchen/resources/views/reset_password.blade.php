<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
</head>
<body>
    <table style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; border-collapse: collapse;">
        <tr>
            <td style="background-color: #f5f5f5; text-align: center; padding: 20px;">
                <h2>Reset Password</h2>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <p>Hello {{ $details['username'] }},</p>
                <p>You have requested to reset your password for your account at {{ $details['website'] }}.</p>
                <p>Please click the following link to reset your password:</p>
                <p><a href="{{ $details['url'] }}">{{ $details['url'] }}</a></p>
                <p>If you did not request this, please ignore this email.</p>
                <p>Thank you,</p>
                <p>The {{ $details['website'] }} Team</p>
            </td>
        </tr>
        <tr>
            <td style="background-color: #f5f5f5; text-align: center; padding: 20px;">
                <p style="font-size: 12px; color: #999;">This email was sent to you as part of your account with {{ $details['website'] }}. If you have any questions or concerns, please contact us.</p>
            </td>
        </tr>
    </table>
</body>
</html>
