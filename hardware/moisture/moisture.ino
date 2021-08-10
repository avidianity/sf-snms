void setup()
{
    Serial.begin(9600);
}

void loop()
{
    int value = analogRead(A0);
    float moisture = (value / 1023) * 100;

    Serial.print("{\"moisture\":");
    Serial.print(moisture);
    Serial.println("}");
    delay(1000);
}
