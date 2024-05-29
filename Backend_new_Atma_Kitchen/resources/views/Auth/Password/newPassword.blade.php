<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>auth</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body style="background: lightgray">
    <main>
        <div class="container mt-5">
            <form action="{{ route('reset.password.post') }}" method="POST">
                @csrf
                <input name="token" type="text" hidden value="{{$token}}">
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" name="email" >
                </div>
                <div class="mb-3">
                    <label class="form-label">new password</label>
                    <input type="password" class="form-control" name="password" >
                </div>
                <div class="mb-3">
                    <label class="form-label">confirm new password</label>
                    <input type="password" class="form-control" name="password_confirmation" >
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </main>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
