import 'package:flutter/material.dart';
import 'package:atma_kitchen/services/auth_service.dart';
import 'package:atma_kitchen/view/Home/customerView.dart';
import 'package:atma_kitchen/view/Home/moView.dart';
import 'package:atma_kitchen/view/registerView.dart';

class LoginView extends StatefulWidget {
  const LoginView({Key? key}) : super(key: key);

  @override
  _LoginViewState createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  String token = '';
  String _email = '';
  String _password = '';
  int id = 0; // Ubah tipe data id menjadi int

  loginPressed(BuildContext context) async {
    if (_email.isNotEmpty && _password.isNotEmpty) {
      try {
        Map<String, dynamic> responseData =
            await AuthServices.login(_email, _password);
        if (responseData.containsKey('data')) {
          Map<String, dynamic> userData = responseData['data'];
          setState(() {
            token = responseData['token'];
          });
          if (userData.containsKey('id_role')) {
            if (userData['id_role'] == 3) {
              // Tidak ada kebutuhan untuk menggunakan BuildContext di sini
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => MOView(token),
                ),
              );
            } else if (userData['id_role'] == 4) {
              // Tidak ada kebutuhan untuk menggunakan BuildContext di sini
              id = userData['id'] as int; // Simpan id sebagai int
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => CustomerView(token, id.toString()), // Konversi id menjadi String
                ),
              );
            } else {
              errorSnackBar(context, 'tidak ada akun yang sesuai');
            }
          }
        }
      } catch (e) {
        print('Login error: $e');
        errorSnackBar(context, 'Gagal login: $e');
      }
    } else {
      errorSnackBar(context, 'Email dan Password tidak boleh kosong');
    }
  }

  errorSnackBar(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.red,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Login'),
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
                setState(() {
                  _email = value;
                });
              },
            ),
            const SizedBox(height: 16.0),
            TextField(
              obscureText: true,
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
            ElevatedButton(
              onPressed: () => loginPressed(context),
              child: const Text('Login'),
            ),
            const SizedBox(height: 16.0),
            GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (BuildContext context) => const RegisterView(),
                  ),
                );
              },
              child: const Text(
                'Dont have an account? Sign in here!',
                style: TextStyle(color: Colors.blue, fontSize: 16.0),
              ),
            )
          ],
        ),
      ),
    );
  }
}
