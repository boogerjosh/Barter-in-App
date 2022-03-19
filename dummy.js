{
  /* <View style={{ marginTop: 10 }}>
          {categories.map((chunk, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                {chunk.map((category) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.push("ListItemHome")}
                    >
                      <View
                        key={category.id}
                        style={{
                          width: width / 3 - 30,
                          marginHorizontal: 10,
                          justifyContent: "center",
                          marginBottom: 20,
                        }}
                      >
                        <View
                          style={{
                            position: "absolute",
                            top: 0,
                            backgroundColor: COLORS.PRIMARY_LIGHT,
                            borderRadius: 10,
                            width: width / 3 - 30,
                            height: width / 3 - 60,
                          }}
                        />
                        <View>
                          <Image
                            source={category.image}
                            style={{
                              width: width / 3 - 30,
                              height: width / 3 - 30,
                            }}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontFamily: FONTS.BOLD,
                            }}
                          >
                            {category.title}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View> */
}
