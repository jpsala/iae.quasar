cd /prg/iae.quasar/src-cordova/platforms/android/app/build/outputs/apk/release
rm -f app.apk
/opt/android-sdk/build-tools/29.0.0/zipalign -v -p 4 app-release-unsigned.apk app.apk
rm -f app-signed.apk
/opt/android-sdk/build-tools/29.0.0/apksigner sign --ks release-key.jks --out app-signed.apk app.apk
cp app-signed.apk /prg/iae.quasar/apk
cd -
