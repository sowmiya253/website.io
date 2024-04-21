<?php
// Step 1: Define your MySQL database credentials
$servername = "localhost"; // Change this if your MySQL server is on a different host
$username = "root"; // Replace with your MySQL username
$password = "25032002"; // Replace with your MySQL password
$database = "banking_system"; // Replace with the name of your MySQL database
$table = "transfer"; // Replace with the name of your table

// Step 2: Create a connection to the MySQL database
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Step 3: After processing a transaction, insert the transaction data into the table
$date = date("Y-m-d"); // Get current date
$sender = $_POST['sender']; // Assuming sender data is sent via a form
$recipient = $_POST['recipient']; // Assuming recipient data is sent via a form
$amount = $_POST['amount']; // Assuming amount data is sent via a form

// Prepare SQL statement to insert data into the table
$sql = "INSERT INTO $table (date, sender, recipient, amount) VALUES ('$date', '$sender', '$recipient', '$amount')";

// Execute SQL statement
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();
?>
