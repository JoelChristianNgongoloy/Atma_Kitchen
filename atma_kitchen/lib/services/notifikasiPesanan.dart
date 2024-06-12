import 'package:atma_kitchen/services/globals.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class NotifikasiPesanan {
  static Future<http.Response> getNotifications(String token, int customerId) async {
    var url = Uri.parse('$baseURL/pesanan/notifHp');
    http.Response response = await http.post(
      url,
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: jsonEncode({'id_customer': customerId}),
    );
    return response;
  }
}