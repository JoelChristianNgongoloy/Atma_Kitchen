import 'dart:convert';

import 'package:atma_kitchen/services/auth_service.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:atma_kitchen/roundBtn.dart';
import 'package:atma_kitchen/view/loginView.dart';
import 'package:atma_kitchen/services/globals.dart';
import 'package:http/http.dart' as http;

class RegisterView extends StatefulWidget {
  const RegisterView({Key? key}) : super(key: key);

  @override
  _registerViewState createState() => _registerViewState();
}

class _registerViewState extends State<RegisterView> {
  String _email = '';
  String _password = '';
  String _username = '';
  String _nama = '';
  String _tanggal_lahir = '';
  int _role = 4;

  createAccount() async {
    bool emailValid =
        RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(_email);
    if (!emailValid) {
      errorSnackBar(context, 'Email tidak valid');
      return;
    }
    http.Response response = await AuthServices.register(
        _nama, _email, _password, _username, _tanggal_lahir, _role);
    Map responseMap = jsonDecode(response.body);
    if (response.statusCode == 200) {
      Navigator.push(
          context,
          MaterialPageRoute(
            builder: (BuildContext context) => const LoginView(),
          ));
    } else {
      errorSnackBar(context, responseMap.values.first[0]);
    }
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );
    if (pickedDate != null && pickedDate != DateTime.now()) {
      setState(() {
        final DateFormat formatter = DateFormat('yyyy-MM-dd');
        _tanggal_lahir = formatter.format(pickedDate);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Register'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const SizedBox(height: 16.0),
            TextField(
              decoration: const InputDecoration(
                labelText: 'Email',
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {
                _email = value;
              },
            ),
            const SizedBox(height: 16.0),
            TextField(
              decoration: const InputDecoration(
                labelText: 'Password',
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {
                setState(() {
                  _password = value;
                });
              },
            ),
            const SizedBox(height: 16.0),
            TextField(
              decoration: const InputDecoration(
                labelText: 'Username',
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {
                setState(() {
                  _username = value;
                });
              },
            ),
            const SizedBox(height: 16.0),
            TextField(
              decoration: const InputDecoration(
                labelText: 'Nama',
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {
                setState(() {
                  _nama = value;
                });
              },
            ),
            const SizedBox(height: 16.0),
            TextField(
              onTap: () => _selectDate(context),
              decoration: InputDecoration(
                labelText: 'Tanggal Lahir',
                border: OutlineInputBorder(),
                suffixIcon: Icon(Icons.calendar_today),
              ),
              readOnly: true,
              controller: TextEditingController(text: _tanggal_lahir),
            ),
            const SizedBox(height: 16.0),
            RoundBtn(
              text: 'create account',
              onPressed: () => createAccount(),
            ),
            SizedBox(height: 16.0),
            GestureDetector(
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (BuildContext context) => const LoginView(),
                    ));
              },
              child: const Text(
                'Already have an account? Login here!',
                style: TextStyle(color: Colors.blue, fontSize: 16.0),
              ),
            )
          ],
        ),
      ),
    );
  }
}
