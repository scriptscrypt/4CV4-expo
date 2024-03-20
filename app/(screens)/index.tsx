import { StyleSheet, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import TeamLogoCard from "../appComponents/appCards/TeamLogoCard";
import SmallMatchCard from "../appComponents/appCards/SmallMatchCard";
import MatchCard from "../appComponents/appCards/MatchCard";
import CarouselComponent from "../appComponents/appUtils/Carousal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SectionHeader from "../appComponents/appNavigators/SectionHeader";
import { colors4C, sizes4C } from "../asthetics";
import { Link } from "expo-router";
import GoogleLogin from "../(auth)/GoogleLogin";
import { apiGetMatchesByStatus } from "../services/BEApis/match";

const HomeScreen = () => {
  const [recentMatches, setRecentMatches] = useState([]);

  const teamLogoCardsData = [
    "RCB",
    "DC",
    "MI",
    "KKR",
    "CSK",
    "SRH",
    "PBKS",
    "RR",
    "GT",
    "LSG",
  ];

  const teamLogoCardsJSX = teamLogoCardsData.map((item, index) => (
    <TeamLogoCard teamName={item} key={index} />
  ));

  const matchCardsData = [
    {
      matchStatus: "Live",
      teamA: "CSK",
      teamB: "MI",
      cardSummary: "CSK 142/5 (16.5)",
      navigateTo: "/(match)/1",
    },
    {
      matchStatus: "Live",
      teamA: "CSK",
      teamB: "RR",
      cardSummary: "Head to Head - 5 : 6",
      navigateTo: "/(match)/2",
    },
    {
      matchStatus: "Upcoming",
      teamA: "DC",
      teamB: "MI",
      cardSummary: "Head to Head - 4 : 9",
      navigateTo: "/(match)/3",
    },
  ];

  const trendingMatchesJSX = matchCardsData.map((card, index) => (
    <SmallMatchCard
      key={index}
      matchStatus={card.matchStatus}
      teamA={card.teamA}
      teamB={card.teamB}
      cardSummary={card.cardSummary}
      navigateTo={card.navigateTo}
    />
  ));

  const fnGetRecentMatches = async (): Promise<void> => {
    const res = await apiGetMatchesByStatus("Upcoming");
    console.log("Res fnGetRecentMatches", res);
    setRecentMatches(res?.data);
  };

  // Assuming recentMatches is a state variable of type RecentMatches
  const recentMatchesJSX = recentMatches.map((item: any, index: number) => (
    <MatchCard
      key={index}
      showTopIcon={item.showTopIcon}
      matchNo={item.matchNo}
      tossSummary={item.matchToss}
      showScores={item.showScores}
      matchStatus={item.matchStatus}
      teamA={item.matchTeamA}
      teamAScore={item.teamAScore}
      teamAOvers={item.teamAOvers}
      teamB={item.matchTeamB}
      teamBScore={item.teamBScore}
      teamBOvers={item.teamBOvers}
      showSummary={item.showSummary}
      matchSummary={item.matchSummary}
      navigateTo={`(match)/${item.matchNo}`}
    />
  ));

  useEffect(() => {
    fnGetRecentMatches();
  }, []);

  return (
    <>
      <GestureHandlerRootView>
        <ScrollView style={styles.container}>
          <CarouselComponent />
          <SectionHeader
            headingName="IPL Teams"
            navigateTo="/(match)/AllMatchesScreen"
          />
          <ScrollView
            horizontal
            contentContainerStyle={styles.smallCardContainer}
          >
            {teamLogoCardsJSX}
          </ScrollView>
          <SectionHeader
            headingName="Trending Matches"
            navigateTo="/(match)/AllMatchesScreen"
          />
          <ScrollView
            horizontal
            contentContainerStyle={styles.smallCardContainer}
          >
            {trendingMatchesJSX}
          </ScrollView>
          <SectionHeader
            headingName="Recent Matches"
            navigateTo="/(match)/AllMatchesScreen"
          />
          <View style={{ flexDirection: "column", gap: sizes4C.small4C }}>
            {recentMatchesJSX}
          </View>
        </ScrollView>
      </GestureHandlerRootView>
      {/* <GoogleLogin /> */}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: sizes4C.medium4C,
    backgroundColor: colors4C.light4C,
  },
  smallCardContainer: {
    flexDirection: "row",
    gap: sizes4C.medium4C,
  },
});
