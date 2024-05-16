import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
 
const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: '#C15A5A', fontFamily: 'Knewave' }]}>Firewave</Text>
        <View style={styles.setting}>
          <Text style={styles.settingText}>FAQ</Text>
          {}
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Interdits/Autorisés</Text>
          {}
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Contact</Text>
          {}
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Crédits</Text>
          {/* Add Crédits content here */}
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Coco</Text>
          {/* Add Coco content here */}
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Boutique</Text>
          {/* Add Boutique content here */}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionHeader, { color: '#C15A5A', fontFamily: 'Knewave' }]}>Infos pratiques</Text>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Le Staff</Text>
          {/* Add Le Staff content here */}
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Accès</Text>
          {/* Add Accès content here */}
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Camping</Text>
          {/* Add Camping content here */}
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Conditions d'Utilisations</Text>
          {/* Add Conditions d'Utilisations content here */}
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Politique de Confidentialité</Text>
          {/* Add Politique de Confidentialité content here */}
        </View>
        <View style={styles.setting}>
          <Text style={styles.settingText}>Cookies</Text>
          {/* Add Cookies content here */}
        </View>
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E5CC',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Knewave',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingText: {
    fontSize: 25,
  },
});
 
export default Settings;