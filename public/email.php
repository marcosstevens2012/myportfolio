<?php
// Configuración de respuesta JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Verificar que sea una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Validar que se recibieron los datos
if (!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Faltan campos requeridos']);
    exit;
}

// Sanitizar y validar datos
$visitor_name = trim(htmlspecialchars($_POST['name']));
$visitor_email = trim($_POST['email']);
$visitor_message = trim(htmlspecialchars($_POST['message']));

// Validaciones
if (empty($visitor_name) || empty($visitor_email) || empty($visitor_message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Todos los campos son requeridos']);
    exit;
}

// Validar email
if (!filter_var($visitor_email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email no válido']);
    exit;
}

// Configuración del email
$recipient = "marcosstevens.web@gmail.com";
$subject = "Nuevo mensaje desde Portfolio - " . $visitor_name;

// Crear el mensaje HTML
$email_content = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Nuevo mensaje desde tu Portfolio</title>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
    <div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;'>
        <h2 style='color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;'>
            Nuevo mensaje desde tu Portfolio
        </h2>
        
        <div style='margin: 20px 0;'>
            <p><strong>Nombre:</strong> " . $visitor_name . "</p>
            <p><strong>Email:</strong> " . $visitor_email . "</p>
        </div>
        
        <div style='margin: 20px 0;'>
            <h3 style='color: #34495e;'>Mensaje:</h3>
            <div style='background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; border-radius: 5px;'>
                " . nl2br($visitor_message) . "
            </div>
        </div>
        
        <hr style='margin: 20px 0; border: none; border-top: 1px solid #eee;'>
        
        <p style='color: #7f8c8d; font-size: 12px;'>
            Este mensaje fue enviado desde tu portfolio web el " . date('d/m/Y H:i:s') . "
        </p>
    </div>
</body>
</html>
";

// Headers del email
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: Portfolio Web <noreply@marcosstevens.dev>',
    'Reply-To: ' . $visitor_email,
    'X-Mailer: PHP/' . phpversion()
];

// Intentar enviar el email
if (mail($recipient, $subject, $email_content, implode("\r\n", $headers))) {
    echo json_encode([
        'success' => true, 
        'message' => '¡Gracias por tu mensaje, ' . $visitor_name . '! Te responderé pronto.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Error al enviar el mensaje. Por favor, intenta nuevamente.'
    ]);
}
?>