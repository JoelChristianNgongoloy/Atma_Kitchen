import 'package:flutter/material.dart';
import 'package:atma_kitchen/services/notifikasiPesanan.dart';
import 'dart:convert';


class NotifikasiPesananView extends StatefulWidget {
  final String token;
  final int customerId;

  const NotifikasiPesananView({
    required this.token,
    required this.customerId,
  });

  @override
  _NotifikasiPesananViewState createState() => _NotifikasiPesananViewState();
}

class _NotifikasiPesananViewState extends State<NotifikasiPesananView> {
  List<Map<String, dynamic>> notifications = [];

  @override
  void initState() {
    super.initState();
    fetchNotifications();
  }

  Future<void> fetchNotifications() async {
    try {
      var response = await NotifikasiPesanan.getNotifications(widget.token, widget.customerId);
      if (response.statusCode == 200) {
        setState(() {
          notifications = jsonDecode(response.body)['notifications'];
        });
      } else {
        // Handle error response
        print('Failed to fetch notifications: ${response.statusCode}');
      }
    } catch (e) {
      // Handle network error
      print('Error fetching notifications: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Notifikasi Pesanan'),
      ),
      body: notifications.isEmpty
          ? Center(
              child: Text('Tidak ada notifikasi pesanan'),
            )
          : ListView.builder(
              itemCount: notifications.length,
              itemBuilder: (context, index) {
                var notification = notifications[index];
                return ListTile(
                  title: Text(notification['message']),
                  subtitle: Text('ID Pesanan: ${notification['id_pesanan']}'),
                );
              },
            ),
    );
  }
}
