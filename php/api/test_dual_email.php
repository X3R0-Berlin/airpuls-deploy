<?php
require_once 'config.php';

echo "<pre>Starting dual email text with debug enabled...\n";

// Enable detailed SMTP logs
global $enableSmtpDebug;
$enableSmtpDebug = true;

global $disableJsonError;
$disableJsonError = true;

// 1. Send first email (Admin Notification)
$to = 'team@airimpuls.com';
$subject1 = 'Debug 1: Admin Notification';
$body1 = 'This is the first email sent in the script.';
echo "\n=====================\n";
echo "Sending Email 1...\n";
echo "=====================\n";
$success1 = sendEmail($to, $subject1, $body1);
echo "\nEmail 1 Result: " . ($success1 ? "SUCCESS" : "FAILED") . "\n";

// 2. Send second email (Auto-Responder)
$subject2 = 'Debug 2: Customer Auto-Responder';
$body2 = 'This is the second email sent immediately after the first one.';
echo "\n=====================\n";
echo "Sending Email 2...\n";
echo "=====================\n";
$success2 = sendEmail($to, $subject2, $body2);
echo "\nEmail 2 Result: " . ($success2 ? "SUCCESS" : "FAILED") . "\n";

echo "\nFinished test.\n</pre>";
