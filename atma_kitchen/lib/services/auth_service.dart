import 'dart:convert';
import 'package:atma_kitchen/services/globals.dart';
import 'package:http/http.dart' as http;

class AuthServices {
  static Future<http.Response> register(String nama, String email,
      String password, String username, String tanggal_lahir, int role) async {
    Map data = {
      'nama': nama,
      'email': email,
      'password': password,
      'username': username,
      'tanggal_lahir': tanggal_lahir,
      'role': role,
    };
    var body = json.encode(data);
    var url = Uri.parse(baseURL + '/register');
    http.Response response = await http.post(
      url,
      headers: headers,
      body: body,
    );
    print(response.body);
    return response;
  }

  static Future<Map<String, dynamic>> login(
      String email, String password) async {
    Map data = {
      'email': email,
      'password': password,
    };
    var body = json.encode(data);
    var url = Uri.parse(baseURL + '/login');
    http.Response response = await http.post(
      url,
      headers: headers,
      body: body,
    );
    if (response.statusCode == 200) {
      // If login successful, parse the response body and return the data including id_role
      Map<String, dynamic> responseBody = json.decode(response.body);

      print(responseBody['data']);
      return responseBody;
    } else {
      // If login fails, parse the error message from response body and throw an exception
      throw Exception(json.decode(response.body)['message']);
    }
  }
}
