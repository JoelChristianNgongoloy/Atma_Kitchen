import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:atma_kitchen/services/globals.dart';


class NotificationScreen extends StatefulWidget {
  final String token; // Tambahkan token sebagai argumen konstruktor
  const NotificationScreen({Key? key, required this.token}) : super(key: key);

  @override
  _NotificationScreenState createState() => _NotificationScreenState();
}

class _NotificationScreenState extends State<NotificationScreen> {
  List<Map<String, dynamic>> notifications = []; // List to store notifications

  @override
  void initState() {
    super.initState();
    fetchNotifications();
  }

  void fetchNotifications() async {
    try {
      var response = await http.post(
        Uri.parse('$baseURL/pesanan/notifHp'),
        headers: {
          'Authorization': 'Bearer ${widget.token}', // Gunakan token dari widget
          'Content-Type': 'application/json',
        },
        body: jsonEncode({'id_customer': 0}), // Ganti dengan id customer yang sesuai jika diperlukan
      );
      if (response.statusCode == 200) {
        var data = jsonDecode(response.body); // Decode JSON response
        setState(() {
          notifications = List<Map<String, dynamic>>.from(data['notifications']); // Save notifications data
        });
      } else {
        // Handle error response
        print('Failed to fetch notifications');
      }
    } catch (e) {
      // Handle any exceptions
      print('Error fetching notifications: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Notifications'),
      ),
      body: ListView.builder(
        itemCount: notifications.length,
        itemBuilder: (context, index) {
          var notification = notifications[index];
          return ListTile(
            title: Text(notification['message']), // Display notification message
            subtitle: Text('Status: ${notification['status_pesanan']}'), // Display status
          );
        },
      ),
    );
  }
}
