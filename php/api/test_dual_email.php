<?php
require_once 'config.php';

echo "Starting dual email text...\n";

// 1. Send first email (Admin Notification)
$to = 'team@airimpuls.com';
$subject1 = 'Debug 1: Admin Notification';
$body1 = 'This is the first email sent in the script.';
echo "Sending Email 1...\n";
$success1 = sendEmail($to, $subject1, $body1);
echo "Email 1 Result: " . ($success1 ? "SUCCESS" : "FAILED") . "\n";

// 2. Send second email (Auto-Responder)
$subject2 = 'Debug 2: Customer Auto-Responder';
$body2 = 'This is the second email sent immediately after the first one.';
echo "Sending Email 2...\n";
$success2 = sendEmail($to, $subject2, $body2);
echo "Email 2 Result: " . ($success2 ? "SUCCESS" : "FAILED") . "\n";

echo "Finished test.\n";
