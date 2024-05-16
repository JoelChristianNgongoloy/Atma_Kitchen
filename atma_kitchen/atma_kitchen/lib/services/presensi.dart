import 'package:atma_kitchen/services/globals.dart';
import 'package:http/http.dart' as http;

class Presensi {
  static Future<http.Response> index(String token) async {
    var url = Uri.parse(baseURL + '/presensi');
    http.Response response = await http.get(
      url,
      headers: {
        'Authorization': 'Bearer $token',
      },
    );
    return response;
  }

  static Future<http.Response> store(String token, String idUser) async {
    var url = Uri.parse(baseURL + '/presensi');
    http.Response response = await http.post(
      url,
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: '{"id_user": "$idUser"}',
    );
    return response;
  }

  static Future<http.Response> update(
      String token, int id, String status) async {
    var url = Uri.parse(baseURL + '/presensi/$id');
    http.Response response = await http.put(
      url,
      headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      },
      body: '{"status_presensi": "$status"}',
    );
    return response;
  }
}
