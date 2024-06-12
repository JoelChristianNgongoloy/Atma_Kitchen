import 'package:atma_kitchen/view/Home/customerView.dart';
import 'package:atma_kitchen/view/Home/moView.dart';
import 'package:atma_kitchen/view/registerView.dart';
import 'package:flutter/material.dart';
import 'package:atma_kitchen/roundBtn.dart';
import 'package:atma_kitchen/services/auth_service.dart';
import 'package:atma_kitchen/view/Home/pencatatanbahanbakuview.dart';
import 'package:atma_kitchen/services/globals.dart';
import 'package:http/http.dart' as http;
import 'package:atma_kitchen/view/Home/MO/laporanView.dart';

class LoginView extends StatefulWidget {
  const LoginView({Key? key}) : super(key: key);

  @override
  _loginViewState createState() => _loginViewState();
}

class _loginViewState extends State<LoginView> {
  String token = '';
  String _email = '';
  String _password = '';

  loginPressed() async {
    if (_email.isNotEmpty && _password.isNotEmpty) {
      Map<String, dynamic> responseData =
          await AuthServices.login(_email, _password);
      if (responseData.containsKey('data')) {
        Map<String, dynamic> userData = responseData['data'];
        token = responseData['token'];
        if (userData.containsKey('id_role')) {
          if (userData['id_role'] == 3) {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (BuildContext context) => laporanView(token),
              ),
            );
          } else if (userData['id_role'] == 4) {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (BuildContext context) => const CustomerView(),
              ),
            );
          } else {
            errorSnackBar(context, 'tidak ada akun yang sesuai');
          }
        }
      }
    } else {
      errorSnackBar(context, 'Email dan Password tidak boleh kosong');
    }
  }

  login() {
    print('email: $_email');
    print('password: $_password');
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
            RoundBtn(
              text: 'Login',
              onPressed: () => loginPressed(),
            ),
            SizedBox(height: 16.0),
            GestureDetector(
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (BuildContext context) => const RegisterView(),
                    ));
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
