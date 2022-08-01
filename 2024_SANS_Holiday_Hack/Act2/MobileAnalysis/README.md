### Mobile Analysis
Help find who has been left out of the naughty AND nice list this Christmas. Please speak with Eve Snowshoes for more information.
Difficulty: 2/5<br>
Solved: Silver, Gold

---

***Mobile Analysis Easy - Tools***<br>
From: Eve Snowshoes<br>
Try using [apktool](https://github.com/iBotPeaches/Apktool/releases) or [jadx](https://github.com/skylot/jadx)

***Mobile Analysis Easy - Missing***<br>
From: Eve Snowshoes<br>
Maybe look for what names are included and work back from that?

---

### Silver Solution

> Ellie

We decompile the challenge file `SantaSwipe.apk` into the `SantaSwipe` directory using the `jadx` tool:

```bash
jadx -d SantaSwipe SantaSwipe.apk
```

Next we search the `SantaSwipe` directory for files containing all three of the words `naughty`, `nice`, and `list`:

```bash
grep -ril "naughty" SantaSwipe | xargs grep -il "nice" | xargs grep -il "list"
```

The matching files are:

```
SantaSwipe/resources/assets/index.html
SantaSwipe/resources/classes3.dex
SantaSwipe/sources/com/northpole/santaswipe/DatabaseHelper.java
SantaSwipe/sources/com/northpole/santaswipe/MainActivity.java
```

The `DatabaseHelper.java` file contains code creating the `NiceList`, `NaughtyList`, and `NormalList`: 

```java
// SantaSwipe/sources/com/northpole/santaswipe/DatabaseHelper.java
db.execSQL("CREATE TABLE IF NOT EXISTS NiceList (Item TEXT);");
db.execSQL("CREATE TABLE IF NOT EXISTS NaughtyList (Item TEXT);");
db.execSQL("CREATE TABLE IF NOT EXISTS NormalList (Item TEXT);");
```

Additionally the `DatabaseHelper.java` fills the `NormalList` with rows containing children's names, including a row adding a child name `Ellie`:

```java
// SantaSwipe/sources/com/northpole/santaswipe/DatabaseHelper.java
db.execSQL("INSERT INTO NormalList (Item) VALUES ('Ellie, Alabama, USA');");
```

Now looking at the `MainActivity.java` file, we see that the app displays data from every row on the `NormalList` except rows that contain the name `Ellie`:

```java
// SantaSwipe/sources/com/northpole/santaswipe/MainActivity.java
Cursor cursor = sQLiteDatabase.rawQuery("SELECT Item FROM NormalList WHERE Item NOT LIKE '%Ellie%'", null);
    List items = new ArrayList();
    Log.d("WebAppInterface", "Fetching items from NormalList table");
    while (cursor.moveToNext()) {
        String item = cursor.getString(0);
        Intrinsics.checkNotNull(item);
        items.add(item);
        Log.d("WebAppInterface", "Fetched item: " + item);
    }
    cursor.close();
```


---

### Gold Solution
> Joshua

**Eve Snowshoes**

Like with the `SantaSwipe.apk` file, we use `jadx` to decompile the challenge file `SantaSwipeSecure.aab` and then search the decompiled directory for files containing the words `naughty`, `nice`, and `list`:

```bash
jadx -d SantaSwipeSecure SantaSwipeSecure.aab
grep -ril "naughty" SantaSwipeSecure | xargs grep -il "nice" | xargs grep -il "list"
```

The matching files are:

```
SantaSwipeSecure/resources/base/assets/index.html
SantaSwipeSecure/resources/base/dex/classes.dex
SantaSwipeSecure/sources/com/northpole/santaswipe/DatabaseHelper.java
SantaSwipeSecure/sources/com/northpole/santaswipe/MainActivity.java
```

The `DatabaseHelper.java` file contains code creating the `NiceList`, `NaughtyList`, and `NormalList`:

```java
// SantaSwipeSecure/sources/com/northpole/santaswipe/DatabaseHelper.java
db.execSQL("CREATE TABLE IF NOT EXISTS NiceList (Item TEXT);");
db.execSQL("CREATE TABLE IF NOT EXISTS NaughtyList (Item TEXT);");
db.execSQL("CREATE TABLE IF NOT EXISTS NormalList (Item TEXT);");
```

Additionally the file also includes an `onCreate()` function that executes an encrypted SQL query before calling the `insertInitialData()` function:

```java
// SantaSwipeSecure/sources/com/northpole/santaswipe/DatabaseHelper.java
db.execSQL(decryptData("IVrt+9Zct4oUePZeQqFwyhBix8cSCIxtsa+lJZkMNpNFBgoHeJlwp73l2oyEh1Y6AfqnfH7gcU9Yfov6u70cUA2/OwcxVt7Ubdn0UD2kImNsclEQ9M8PpnevBX3mXlW2QnH8+Q+SC7JaMUc9CIvxB2HYQG2JujQf6skpVaPAKGxfLqDj+2UyTAVLoeUlQjc18swZVtTQO7Zwe6sTCYlrw7GpFXCAuI6Ex29gfeVIeB7pK7M4kZGy3OIaFxfTdevCoTMwkoPvJuRupA6ybp36vmLLMXaAWsrDHRUbKfE6UKvGoC9d5vqmKeIO9elASuagxjBJ"));
insertInitialData(db);
```

The `insertInitialData()` function adds encrypted rows to the `NormalList`:

```java
// SantaSwipeSecure/sources/com/northpole/santaswipe/DatabaseHelper.java
private final void insertInitialData(SQLiteDatabase db) {
        String[] strArr = new String[270];
        strArr[R.xml.backup_rules] = "L2HD1a45w7EtSN41J7kx/hRgPwR8lDBg9qUicgz1qhRgSg==";
        ...
        strArr[269] = "J2zf2/B95PJmf9RuJ7k1/AZr259XFLll5xvRfxu/YDOTFR460RwK+Q==";
        Iterator it = CollectionsKt.listOf((Object[]) strArr).iterator();
        while (it.hasNext()) {
            db.execSQL("INSERT INTO NormalList (Item) VALUES ('" + StringsKt.trim((CharSequence) it.next()).toString() + "');");
        }
    }
```

We can decrypt the SQL query in the `onCreate()` function and the rows added to the `NormalList` in the `insertInitialData()` function by altering the encryption scheme code in the `DatabaseHelper.java` file.

First the `DatabaseHelper.java` file gets the location of the key `R.string.ek` and iv `R.string.iv` from the `R.java` file. Then it gets the actual value of the key `string` and iv `string` from the `strings.xml` file and decodes them:

```java
// SantaSwipeSecure/sources/com/northpole/santaswipe/DatabaseHelper.java
String string = context.getString(R.string.ek);
Intrinsics.checkNotNullExpressionValue(string, "getString(...)");
String obj = StringsKt.trim((CharSequence) string).toString();
String string2 = context.getString(R.string.iv);
Intrinsics.checkNotNullExpressionValue(string2, "getString(...)");
String obj2 = StringsKt.trim((CharSequence) string2).toString();
byte[] decode = Base64.decode(obj, R.xml.backup_rules);
Intrinsics.checkNotNullExpressionValue(decode, "decode(...)");
this.encryptionKey = decode;
byte[] decode2 = Base64.decode(obj2, R.xml.backup_rules);
Intrinsics.checkNotNullExpressionValue(decode2, "decode(...)");
this.iv = decode2;
this.secretKeySpec = new SecretKeySpec(decode, "AES");
```

Next it uses this key and iv in a `decryptData()` function:

```java
// SantaSwipeSecure/sources/com/northpole/santaswipe/DatabaseHelper.java
private final String decryptData(String encryptedData) {
    try {
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(R.styleable.FontFamily, this.secretKeySpec, new GCMParameterSpec(128, this.iv));
        byte[] doFinal = cipher.doFinal(Base64.decode(encryptedData, R.xml.backup_rules));
        Intrinsics.checkNotNull(doFinal);
        return new String(doFinal, Charsets.UTF_8);
    } catch (Exception e) {
        Log.e("DatabaseHelper", "Decryption failed: " + e.getMessage());
        return null;
    }
}
```

We retrieve the key `string` and iv `string2` from the `strings.xml` file:

```xml
<!-- SantaSwipeSecure/resources/res/values/strings.xml -->
<string name="ek">rmDJ1wJ7ZtKy3lkLs6X9bZ2Jvpt6jL6YWiDsXtgjkXw=</string>
...
<string name="iv">Q2hlY2tNYXRlcml4</string
```

Next we define the key and iv:

```java
// soln.java
String string = "rmDJ1wJ7ZtKy3lkLs6X9bZ2Jvpt6jL6YWiDsXtgjkXw=";
String string2 = "Q2hlY2tNYXRlcml4";

String obj = string.trim();
String obj2 = string2.trim();

byte[] decode = Base64.getDecoder().decode(obj);
byte[] decode2 = Base64.getDecoder().decode(obj2);

byte[] this_encryptionKey = decode;
byte[] this_iv = decode2;
SecretKey this_secretKeySpec = new SecretKeySpec(decode, "AES");
```

Next we decrypt:

```java
// soln.java
Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
cipher.init(Cipher.DECRYPT_MODE, this_secretKeySpec, new GCMParameterSpec(128, this_iv));

byte[] doFinal = cipher.doFinal(Base64.getDecoder().decode(encryped));

    String decrypted = new String(doFinal, StandardCharsets.UTF_8);

System.out.println(decrypted);
```

Now we decrypt the command `"IVrt+9Zct4oUePZeQqFwyhBix8cSCIxtsa+lJZkMNpNFBgoHeJlwp73l2oyEh1Y6AfqnfH7gcU9Yfov6u70cUA2/OwcxVt7Ubdn0UD2kImNsclEQ9M8PpnevBX3mXlW2QnH8+Q+SC7JaMUc9CIvxB2HYQG2JujQf6skpVaPAKGxfLqDj+2UyTAVLoeUlQjc18swZVtTQO7Zwe6sTCYlrw7GpFXCAuI6Ex29gfeVIeB7pK7M4kZGy3OIaFxfTdevCoTMwkoPvJuRupA6ybp36vmLLMXaAWsrDHRUbKfE6UKvGoC9d5vqmKeIO9elASuagxjBJ"`:

```
CREATE TRIGGER DeleteIfInsertedSpecificValue
    AFTER INSERT ON NormalList
    FOR EACH ROW
    BEGIN
        DELETE FROM NormalList WHERE Item = 'KGfb0vd4u/4EWMN0bp035hRjjpMiL4NQurjgHIQHNaRaDnIYbKQ9JusGaa1aAkGEVV8=';
    END;
```

Lastly we decrypt the Item in the decrypted command `KGfb0vd4u/4EWMN0bp035hRjjpMiL4NQurjgHIQHNaRaDnIYbKQ9JusGaa1aAkGEVV8=`:

```
Joshua, Birmingham, United Kingdom
```

---