<html xmlns="http://www.w3.org/1999/html">
<head>
    <!-- Styles -->
    <style>
        .contact_us_mail {
            width: 512px;
            padding: 10px;
            margin: auto;
        }

        .contact_us_mail__table {
            width: 100%;
        }

        .text-center {
            text-align: center;
        }

        .divider {
            color: #e0e0e0;
            border: none;
            background-color: #e0e0e0;
            height: 3px;
            margin-top: 20px;
        }

        td, th, p, h2 {
            font-family: 'Lato', sans-serif;
        }

        .logo {
            width: 80px;
            height: 35px;
            margin-top: 10px
        }

        td p {
            margin: 17px 0;
            font-size: 13px;
            color: #6D6C6C
        }
    </style>
</head>
<body>

<div class="contact_us_mail">
    <table class="contact_us_mail__table">
        <tr>
            <td class="text-center">
                <img class="logo" src="{{ $data['logo_url'] }}" alt="">
            </td>
        </tr>
        <tr>
            <td>
                <hr class="divider"/>
            </td>
        </tr>
        <tr>
            <td>
                <p>Hello <strong>{{ $data['first_name']. " ".$data['last_name']}},</strong></p>
                <p>Your book <strong>{{ $data['book_name']}}</strong> is <strong>{{ $data['total_due_days']}} </strong>days
                    due and your total fine upto
                    today is <strong>{{ $data['total_due_amount']}}</strong>. please re-submit it to the library.</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Thank you</p>
            </td>
        </tr>
        <tr>
            <td>
                <hr class="divider"/>
            </td>
        </tr>
    </table>
</div>
</body>
</html>
