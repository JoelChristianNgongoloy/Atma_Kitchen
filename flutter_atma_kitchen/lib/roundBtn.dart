import 'package:flutter/material.dart';

class RoundBtn extends StatelessWidget {
  final String text;
  final Function onPressed;

  const RoundBtn({
    Key? key,
    required this.text,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: 5,
      color: Colors.blue,
      borderRadius: BorderRadius.circular(30),
      child: MaterialButton(
        onPressed: () {
          onPressed();
        },
        minWidth: 200,
        height: 45,
        child: Text(
          text,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 20,
          ),
        ),
      ),
    );
  }
}
