package com.calender_app;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import androidx.annotation.NonNull;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.lang.ref.WeakReference;


public class MyUncaughtExceptionHandler  implements Thread.UncaughtExceptionHandler {
    
    private static final String TAG = "MyUncaughtExceptionHandler";
    private final WeakReference<Activity> mActivity;
    
    public MyUncaughtExceptionHandler(Activity activity) {
       mActivity = new WeakReference<>(activity);
    }
    
   @Override
    public void uncaughtException(@NonNull Thread thread, @NonNull Throwable throwable) {
        Log.e(TAG, "uncaughtException: ", throwable);

        final Activity activity = mActivity.get();
        if (activity != null) {
            Intent intent = activity.getIntent();
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_NO_HISTORY | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            activity.finish();
            activity.startActivity(intent);
        }

        // wait for 2 seconds before restarting the app
        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent = mActivity.get().getIntent();
                mActivity.get().startActivity(intent);
                System.exit(0);
            }
        }, 2000);

        // re-throw the exception to allow the default handler to handle it
        Thread.getDefaultUncaughtExceptionHandler().uncaughtException(thread, throwable);
    }

}