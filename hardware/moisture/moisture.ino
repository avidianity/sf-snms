void setup()
{
    Serial.begin(9600);
}

void loop()
{
    int value = analogRead(A0);
    int moisture = 100 - map(value, 0, 1023, 0, 100);

    Serial.print("{\"moisture\":");
    Serial.print(moisture);
    Serial.println("}");
    delay(1000);
}
