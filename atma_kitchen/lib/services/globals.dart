// import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

const String baseURL =
    "http://192.168.56.1/Atma_Kitchen-joel/Backend_Atma_Kitchen/public/api";
const Map<String, String> headers = {
  'Content-Type': 'application/json',
};

errorSnackBar(BuildContext context, String text) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text(text),
      backgroundColor: Colors.red,
      duration: const Duration(seconds: 1),
    ),
  );
}
