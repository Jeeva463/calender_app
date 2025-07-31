package com.calendar_app;// replace com.your-app-name with your app’s name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import com.calendar_app.R;

public class LedModule extends ReactContextBaseJavaModule {
   LedModule(ReactApplicationContext context) {
       super(context);
   }

   // add to LedModule.java
    @Override
    public String getName() {
        return "LedModule";
    }

    public String adbcommand(String command) {        
        Process process = null;
        DataOutputStream os = null;
        String excresult = "";
        try {
            System.out.println("try");
            //process = Runtime.getRuntime().exec("su");
            process = Runtime.getRuntime().exec("su");
            System.out.println("try 2");
            os = new DataOutputStream(process.getOutputStream());
            os.writeBytes(command + "\n");
            os.writeBytes("exit\n");
            os.flush();
            BufferedReader in = new BufferedReader(new InputStreamReader(
                    process.getInputStream()));
            StringBuffer stringBuffer = new StringBuffer();
            String line = null;
            while ((line = in.readLine()) != null) {
                stringBuffer.append(line + " ");
            }
            excresult = stringBuffer.toString();
            Log.d("Jessica2 " , excresult);
            System.out.println(excresult);

            os.close();
            // System.out.println(excresult);
        } catch (Exception e) {
            System.out.println("catch");
            System.out.println(e);
            e.printStackTrace();
        }
         System.out.println("excresult");
        System.out.println(excresult);
        return excresult;
    }

    @ReactMethod
    public void createLedEvent(String name, int position) {
         switch (position){
            case 0:
                adbcommand("echo w 0x00 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 1:                
                adbcommand("echo w 0x01 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 2:
                adbcommand("echo w 0x02 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 3:
                adbcommand("echo w 0x03 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 4:
                adbcommand("echo w 0x04 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 5:
                adbcommand("echo w 0x05 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 6:
                adbcommand("echo w 0x06 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 7:
                adbcommand("echo w 0x07 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 8:
                adbcommand("echo w 0x08 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 9:
                adbcommand("echo w 0x09 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 10:
                adbcommand("echo w 0x0a > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 11:
                adbcommand("echo w 0x0b > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 12:
                adbcommand("echo w 0x0c > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 13:
                adbcommand("echo w 0x0d > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 14:
                adbcommand("echo w 0x0e > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 15:
                adbcommand("echo w 0x0f > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 16:
                adbcommand("echo w 0x10 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 17:
                adbcommand("echo w 0x11 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 18:
                adbcommand("echo w 0x12 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 19:
                adbcommand("echo w 0x13 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 20:
                adbcommand("echo w 0x14 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 21:
                adbcommand("echo w 0x15 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 22:
                adbcommand("echo w 0x16 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            case 23:
                adbcommand("echo w 0x17 > ./sys/devices/platform/led_con_h/zigbee_reset");
                break;
            default:
                break;
            }
    }

}