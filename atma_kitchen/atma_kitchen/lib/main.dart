import 'package:atma_kitchen/view/loginView.dart';
import 'package:flutter/material.dart';
import "package:atma_kitchen/view/homeView.dart";

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: HomeView(),
    );
  }
}
