//FULL CODE

#include <Wire.h>
#include "MAX30100_PulseOximeter.h"
#include <WiFi.h>
#include <FirebaseESP32.h>
#include <Ticker.h>
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0X27,16,2);


#define WIFI_SSID "4G REMa_2.4G"
#define WIFI_PASSWORD "1high34namw6789"
#define FIREBASE_HOST "https://heart-beat-1-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "Q7SSHX1TBXs2iRiOLE6Ik9u08mpqVbyj9L0uA2ZQ"

FirebaseData fbdb;
PulseOximeter pox;

int button = 19;
int led = 2;           // LED trạng thái
bool ledState = LOW;



volatile bool ledStateToUpdate = false; // Cờ để thông báo Firebase Task cập nhật trạng thái LED

Ticker timer;

// Khởi tạo handle cho các task
TaskHandle_t SensorTaskHandle;
TaskHandle_t LEDTaskHandle;
TaskHandle_t FirebaseTaskHandle;

void setup() {
  Serial.begin(9600);

  // Kết nối Wi-Fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println("Connected!");

  // Kết nối Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  // Cài đặt chân GPIO
  pinMode(button, INPUT);
  pinMode(led, OUTPUT);
  digitalWrite(led, ledState);

  // Khởi tạo cảm biến MAX30100
  if (!pox.begin()) {
    Serial.println("FAILED to initialize MAX30100");
    while (true); // Dừng lại nếu cảm biến không hoạt động
  }

  //
  lcd.init();
  lcd.backlight();

  // Tạo các task FreeRTOS
  xTaskCreatePinnedToCore(
      SensorTask, "Sensor Task", 4096, NULL, 1, &SensorTaskHandle, 0);

  xTaskCreatePinnedToCore(
      LEDTask, "LED Task", 4096, NULL, 1, &LEDTaskHandle, 0);

  xTaskCreatePinnedToCore(
      FirebaseTask, "Firebase Task", 8192, NULL, 1, &FirebaseTaskHandle, 1);
}

void loop() {}

// Task xử lý cảm biến
void SensorTask(void *parameter) {
  while (true) {
    pox.update();  // Cập nhật cảm biến MAX30100
    int heartRate = pox.getHeartRate();

    if (heartRate > 110) {
      ledState = true;
      digitalWrite(led, ledState);
      ledStateToUpdate = true;
      Serial.println("Nhịp tim > 110! Bật LED cảnh báo.");
    }

    vTaskDelay(100 / portTICK_PERIOD_MS); // Kiểm tra mỗi 100ms
  }
}



// Task xử lý LED và nút nhấn
void LEDTask(void *parameter) {
  while (true) {
    int buttonStatus = digitalRead(button);
    if (buttonStatus == HIGH) {
      ledState = !ledState;
      digitalWrite(led, ledState);
      ledStateToUpdate = true; // Thông báo cho Firebase Task
      delay(500);
    }
    vTaskDelay(10 / portTICK_PERIOD_MS);
  }
}

// Task gửi dữ liệu lên Firebase
void FirebaseTask(void *parameter) {
  while (true) {
    // Gửi dữ liệu cảm biến
    sendDataToFirebase();

    // Kiểm tra và cập nhật trạng thái LED lên Firebase nếu cần
    if (ledStateToUpdate) {
      if (Firebase.setInt(fbdb, "/room1/Led", ledState)) {
        Serial.println("Cập nhật trạng thái LED lên Firebase!");
      } else {
        Serial.println("Cập nhật LED thất bại!");
      }
      ledStateToUpdate = false; // Reset cờ sau khi cập nhật
    }

    // Đọc trạng thái LED từ Firebase và cập nhật LED
    if (Firebase.getInt(fbdb, "/room1/Led")) {
      int data = fbdb.intData(); // Lấy dữ liệu trạng thái LED từ Firebase
      if (data == 1) {
        digitalWrite(led, HIGH); // Bật LED từ Firebase
      } else {
        digitalWrite(led, LOW);  // Tắt LED từ Firebase
      }
    } else {
      Serial.println("Lỗi khi đọc trạng thái LED từ Firebase!");
    }

    vTaskDelay(1000 / portTICK_PERIOD_MS); // Chạy mỗi 1 giây
  }
}

// Hàm gửi dữ liệu cảm biến lên Firebase
void sendDataToFirebase() {
  int heartRate = pox.getHeartRate();
  int spo2 = pox.getSpO2();

  // if (heartRate > 0.0 && spo2 > 0.0) {
    FirebaseJson data;
    data.set("/HeartBeat", heartRate);
    data.set("/Spo2", spo2);

    // lcd.setCursor(0,0);
    // lcd.print("Hear: ");
    // lcd.print(heartRate);
    // lcd.setCursor(0,1);
    // lcd.print("SPO2: ");
    // lcd.print(spo2);

    if (Firebase.updateNode(fbdb, "/room1", data)) {
      Serial.printf("Heart rate: %.1d bpm / SpO2: %.1d %%\n", heartRate, spo2);
    } else {
      Serial.println("Cập nhật dữ liệu thất bại!");
    }
  // }
}
