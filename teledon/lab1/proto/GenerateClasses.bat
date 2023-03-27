echo "Generating Java Classes"
protoc -I=. --java_out=JavaFiles --csharp_out=CSharpFiles TeledonProtocol.proto