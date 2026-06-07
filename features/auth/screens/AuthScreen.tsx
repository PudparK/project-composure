import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuth } from "../AuthProvider";

type AuthMode = "sign-in" | "sign-up";

export function AuthScreen() {
  const { authError, clearAuthError, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const isSignIn = mode === "sign-in";
  const title = isSignIn ? "Welcome back" : "Create your space";
  const actionLabel = isSignIn ? "Sign in" : "Create account";
  const switchLabel = isSignIn ? "Create account" : "Sign in instead";

  async function handleSubmit() {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setNotice(null);
      return;
    }

    setIsSubmitting(true);
    setNotice(null);

    try {
      if (isSignIn) {
        await signIn(trimmedEmail, password);
      } else {
        await signUp(trimmedEmail, password);
        setNotice("Account created. Check your email if confirmation is required.");
      }
    } catch {
      setNotice(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSwitchMode() {
    clearAuthError();
    setNotice(null);
    setMode(isSignIn ? "sign-up" : "sign-in");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.panel}>
        <Text style={styles.appName}>Composure</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>Capture fast. Decide later. Return now.</Text>

        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#7b847f"
            style={styles.input}
            textContentType="emailAddress"
            value={email}
          />
          <TextInput
            autoCapitalize="none"
            autoComplete={isSignIn ? "current-password" : "new-password"}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#7b847f"
            secureTextEntry
            style={styles.input}
            textContentType={isSignIn ? "password" : "newPassword"}
            value={password}
          />

          {authError ? <Text style={styles.error}>{authError}</Text> : null}
          {notice ? <Text style={styles.notice}>{notice}</Text> : null}

          <Pressable
            accessibilityRole="button"
            disabled={isSubmitting}
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed || isSubmitting ? styles.buttonPressed : null,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {isSubmitting ? "Working..." : actionLabel}
            </Text>
          </Pressable>

          <Pressable accessibilityRole="button" onPress={handleSwitchMode}>
            <Text style={styles.secondaryAction}>{switchLabel}</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f7f4ef",
  },
  panel: {
    width: "100%",
    maxWidth: 420,
    padding: 24,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d8d0c4",
    backgroundColor: "#fffdf9",
  },
  appName: {
    color: "#2f6f5e",
    fontSize: 16,
    fontWeight: "700",
  },
  title: {
    marginTop: 12,
    color: "#1f2926",
    fontSize: 28,
    fontWeight: "600",
  },
  detail: {
    marginTop: 8,
    color: "#59645f",
    fontSize: 16,
    lineHeight: 22,
  },
  form: {
    gap: 12,
    marginTop: 24,
  },
  input: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#c8bfb3",
    paddingHorizontal: 14,
    color: "#1f2926",
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  error: {
    color: "#9f352f",
    fontSize: 14,
    lineHeight: 20,
  },
  notice: {
    color: "#2f6f5e",
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#2f6f5e",
  },
  buttonPressed: {
    opacity: 0.76,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryAction: {
    paddingVertical: 6,
    color: "#2f6f5e",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
