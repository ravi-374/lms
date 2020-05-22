<html xmlns="http://www.w3.org/1999/html">
<head>
    <!-- Styles -->
    <style>
        .reminder_mail {
            width: 512px;
            padding: 10px;
            margin: auto;
        }

        .reminder_mail__table {
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

<div class="reminder_mail">
    <table class="reminder_mail__table">
        <tr>
            <td class="text-center">
                <img class="logo" src="{{ $logo }}" alt="">
            </td>
        </tr>
        <tr>
            <td>
                <hr class="divider"/>
            </td>
        </tr>
        <tr>
            <td>
                <p>Hello <strong>{{ $firstName. " ".$lastName }},</strong></p>
                <p>We hope you’re well. This is just to remind you that book <strong>{{ '\''.$book.'\'' }}</strong>, you
                    have borrowed from the library, will be due on {{ $dueDate }}.</p>
            </td>
        </tr>
        <tr>
            <td>
                <small>Please let us know if you have any questions.</small>
            </td>
        </tr>
        <tr>
            <td>
                <p>Thank you,<br>
                {{ getSettingValueByKey(\App\Models\Setting::LIBRARY_NAME) }}</p>
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
